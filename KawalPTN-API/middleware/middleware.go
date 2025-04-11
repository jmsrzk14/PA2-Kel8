package middleware

import (
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

const AdminSecretKey = "admin_secret"
const CashierSecretKey = "cashier_secret"
const CustomerSecretKey = "customer_secret"

func RequiredLoginAdmin(ctx *fiber.Ctx) error {
	cookie := ctx.Cookies("jwtAdmin")

	if cookie == "" {
		ctx.Status(fiber.StatusUnauthorized)
		return ctx.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(AdminSecretKey), nil
	})

	if err != nil {
		ctx.Status(fiber.StatusUnauthorized)
		return ctx.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	claims, ok := token.Claims.(*jwt.StandardClaims)

	if !ok || !token.Valid {
		ctx.Status(fiber.StatusUnauthorized)
		return ctx.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	ctx.Locals("id", claims.Issuer)

	if claims.Subject != "admin" {
		return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Access denied",
		})
	}

	return ctx.Next()
}

func RequiredLoginCashier(ctx *fiber.Ctx) error {
	cookie := ctx.Cookies("jwtCashier")

	if cookie == "" {
		ctx.Status(fiber.StatusUnauthorized)
		return ctx.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(CashierSecretKey), nil
	})

	if err != nil {
		ctx.Status(fiber.StatusUnauthorized)
		return ctx.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	claims, ok := token.Claims.(*jwt.StandardClaims)

	if !ok || !token.Valid {
		ctx.Status(fiber.StatusUnauthorized)
		return ctx.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	ctx.Locals("id", claims.Issuer)

	if claims.Subject != "cashier" {
		return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Access denied",
		})
	}

	return ctx.Next()
}

func RequiredLoginCustomer(ctx *fiber.Ctx) error {
	cookie := ctx.Cookies("jwtCustomer")

	if cookie == "" {
		return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthenticated",
		})
	}

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(CustomerSecretKey), nil
	})

	if err != nil {
		return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthenticated",
		})
	}

	claims, ok := token.Claims.(*jwt.StandardClaims)

	if !ok || !token.Valid {
		ctx.Status(fiber.StatusUnauthorized)
		return ctx.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	ctx.Locals("id", claims.Issuer)

	if claims.Subject != "customer" {
		return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Access denied",
		})
	}

	return ctx.Next()
}