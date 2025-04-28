package controllers

import (
	"KawalPTN-API/database"
	"KawalPTN-API/models"
	"fmt"
	"time"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	// "golang.org/x/crypto/bcrypt"
)

const StudentSecretKey = "student_secret"

// func Register(ctx *fiber.Ctx) error {
// 	var data map[string]string

// 	if err := ctx.BodyParser(&data); err != nil {
// 		return err
// 	}

// 	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(data["password"]), 10)
// 	if err != nil {
// 		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 			"error": "Failed to hash password",
// 		})
// 	}

// 	admin := models.Users{
// 		Nama:     data["name"],
// 		Email:    data["email"],
// 		Password: string(hashedPassword),
// 	}

// 	if err := admin.ValidateUsers(); err != nil {
// 		if validateErr, ok := err.(validator.ValidationErrors); ok {
// 			var validationErrors []string
// 			for _, e := range validateErr {
// 				validationErrors = append(validationErrors, e.Error())
// 			}
// 			return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 				"errors": validationErrors,
// 			})
// 		}
// 		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 			"error": "Internal Server Error",
// 		})
// 	}

// 	database.DB.Create(&admin)
// 	return ctx.JSON(admin)
// }

func Login(ctx *fiber.Ctx) error {
	var data map[string]string

	if err := ctx.BodyParser(&data); err != nil {
		return err
	}

	var student models.T_Siswa

	database.DB.Where("username = ?", data["username"]).First(&student)

	if student.Username != data["username"] {
		ctx.Status(fiber.StatusNotFound)
		return ctx.JSON(fiber.Map{
			"message": "user not found",
		})
	}

	if err := student.ValidateTSiswa(); err != nil {
		if validateErr, ok := err.(validator.ValidationErrors); ok {
			var validationErrors []string
			for _, e := range validateErr {
				validationErrors = append(validationErrors, e.Error())
			}
			return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"errors": validationErrors,
			})
		}
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Internal Server Error",
		})
	}

	// if err := bcrypt.CompareHashAndPassword([]byte(student.Password), []byte(data["password"])); err != nil {
	// 	ctx.Status(fiber.StatusBadRequest)
	// 	return ctx.JSON(fiber.Map{
	// 		"message": "incorrect password",
	// 	})
	// }

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": student.ID,
		"exp":     time.Now().Add(time.Minute * 30).Unix(),
		"sub":     "student",
	})

	token, err := claims.SignedString([]byte(StudentSecretKey))

	if err != nil {
		ctx.Status(fiber.StatusInternalServerError)
		return ctx.JSON(fiber.Map{
			"message": "couldn't login",
		})
	}

	prefixedToken := "student-" + token

	cookie := fiber.Cookie{
		Name:     "jwtStudent",
		Value:    prefixedToken,
		Expires:  time.Now().Add(time.Minute * 30),
		HTTPOnly: true,
		Secure:   false,
		SameSite: "Lax",
	}

	ctx.Cookie(&cookie)

	if fiber.StatusOK == 200 {
		fmt.Println("Has been login")
	}

	return ctx.JSON(fiber.Map{
		"message": "login success",
		"token":   prefixedToken,
	})
}

func Profile(ctx *fiber.Ctx) error {
	cookie := ctx.Cookies("jwtStudent")
	if cookie == "" {
		return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Missing JWT cookie",
		})
	}

	tokenString := strings.TrimPrefix(cookie, "student-")

	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fiber.NewError(fiber.StatusUnauthorized, "Invalid signing method")
		}
		return []byte(StudentSecretKey), nil
	})
	if err != nil || !token.Valid {
		fmt.Println("JWT Parse Error:", err)
		return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "unauthenticated (invalid token)",
		})
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "unauthenticated (invalid claims type)",
		})
	}

	userID, ok := claims["user_id"].(float64) // NOTE: jwt-go parse angka sebagai float64
	if !ok {
		return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "unauthenticated (user_id missing)",
		})
	}

	var student models.T_Siswa
	if err := database.DB.Raw(`
		SELECT 
			id, username, nisn, first_name, asal_sekolah, kelompok_ujian, 
			telp1, active, pilihan1_utbk, pilihan2_utbk, 
			pilihan1_utbk_aktual, pilihan2_utbk_aktual 
		FROM t_siswas 
		WHERE id = ?
	`, uint(userID)).Scan(&student).Error; err != nil {
		fmt.Println("Database Error:", err)
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "user not found",
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "success",
		"data":    student,
	})
}

func Logout(c *fiber.Ctx) error {
	cookie := new(fiber.Cookie)
	cookie.Name = "Student"
	cookie.Value = ""
	cookie.Expires = time.Now().Add(-time.Minute)
	cookie.HTTPOnly = true
	cookie.Secure = false

	c.Cookie(cookie)

	return c.JSON(fiber.Map{
		"message": "Successfully logged out",
	})
}
