package main

import (
	"KawalPTN-API/database"
	"KawalPTN-API/routes"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	database.Connect()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
        AllowOrigins: "*", 
        AllowMethods: "GET,POST,PUT,DELETE",
        AllowHeaders: "Content-Type, Authorization",
    }))

	routes.Setup(app)

	err := app.Listen(":8000")
	if err != nil {
		log.Fatal(err)
	}
}