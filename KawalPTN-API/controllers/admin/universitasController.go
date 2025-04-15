package controllers

import (
	"KawalPTN-API/database"
	"KawalPTN-API/models"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func CreateUniversity(ctx *fiber.Ctx) error {
	fmt.Println("Received request:", ctx.FormValue("name"), ctx.FormValue("total"), ctx.FormValue("active"), ctx.FormValue("price"))
	namaPtn := ctx.FormValue("namaPtn")
	if namaPtn == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "namaPtn is required",
		})
	}

	namaSingkat := ctx.FormValue("namaSingkat")
	if namaSingkat == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Nama Singkat must be a valid integer",
		})
	}

	active := ctx.FormValue("active")
	activeInt, err := strconv.Atoi(active)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "active is required",
		})
	}

	alamatWeb := ctx.FormValue("alamatWeb")
	if alamatWeb == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "alamatWeb is required",
		})
	}

	university := models.T_Ptn{
		Nama_ptn:     namaPtn,
		Nama_singkat: namaSingkat,
		Active:       &activeInt,
		Alamat_web:   alamatWeb,
	}

	fmt.Println("Saving to DB:", university)

	database.DB.Create(&university)

	return ctx.JSON(university)
}

func IndexUniversity(ctx *fiber.Ctx) error {
	var university []models.T_Ptn

	database.DB.Find(&university)

	if len(university) == 0 {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "university not found",
		})
	}

	return ctx.JSON(university)
}

func ShowUniversity(ctx *fiber.Ctx) error {
	UniversityIDStr := ctx.Params("id_ptn")

	universityID, err := strconv.Atoi(UniversityIDStr)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid University ID",
		})
	}

	var university models.T_Ptn

	database.DB.Where("id_ptn= ?", universityID).First(&university)

	if universityID != int(university.Id_ptn) {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "University not found",
		})
	}

	return ctx.JSON(university)
}

func UpdateUniversity(ctx *fiber.Ctx) error {
	universityIDStr := ctx.Params("id_ptn")

	universityID, err := strconv.Atoi(universityIDStr)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid university ID",
		})
	}

	var university models.T_Ptn

	database.DB.Where("id_ptn = ?", universityID).First(&university)

	if universityID != int(university.Id_ptn) {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "University not found",
		})
	}

	name := ctx.FormValue("name")
	if name == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "name is required",
		})
	}

	nameShort := ctx.FormValue("nameShort")
	if nameShort == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "nameShort is required",
		})
	}

	url := ctx.FormValue("url")
	if url == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "url is required",
		})
	}

	active := ctx.FormValue("active")
	activeInt, err := strconv.Atoi(active)
	if active == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "active is required",
		})
	}

	result := database.DB.Model(&university).Updates(models.T_Ptn{
		Nama_ptn:     name,
		Nama_singkat: nameShort,
		Alamat_web:   url,
		Active:       &activeInt,
	})
	if result.Error != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error Updating",
			"error":   result.Error.Error(),
		})
	}

	return ctx.JSON(university)

}

func DeleteUniversity(ctx *fiber.Ctx) error {
	universityIDStr := ctx.Params("id_ptn")

	universityID, err := strconv.Atoi(universityIDStr)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid university ID",
		})
	}

	var university models.T_Ptn

	database.DB.Where("id_ptn = ?", universityID).First(&university)

	if universityID != int(university.Id_ptn) {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Product not found",
		})
	}

	if err := database.DB.Delete(&university).Error; err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to Delete Table",
		})
	}

	return ctx.JSON(fiber.Map{
		"message": "Product deleted successfully",
	})
}
