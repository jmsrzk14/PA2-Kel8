package middleware

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

const secretKey = "student_secret"

func JWTMiddleware() fiber.Handler {
    return func(c *fiber.Ctx) error {
        tokenString := c.Cookies("jwtStudent")
        if tokenString == "" {
            return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
                "message": "Missing JWT cookie",
            })
        }

        tokenString = strings.TrimPrefix(tokenString, "student-")
        token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
            if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
                return nil, fiber.NewError(fiber.StatusUnauthorized, "Invalid signing method")
            }
            return []byte(secretKey), nil
        })

        if err != nil || !token.Valid {
            return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
                "message": "Invalid or expired token",
            })
        }

        claims, ok := token.Claims.(jwt.MapClaims)
        if !ok || !token.Valid {
            return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
                "message": "Invalid token claims",
            })
        }

        userID, ok := claims["user_id"];
        if !ok {
            return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
                "message": "User ID not found in token",
            })
        }

        c.Locals("userID", userID)

        return c.Next()
    }
}
