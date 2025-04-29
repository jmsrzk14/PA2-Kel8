package controllers

import (
	"KawalPTN-API/database"
	"KawalPTN-API/models"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func CreateSekolah(ctx *fiber.Ctx) error {
	npsn := ctx.FormValue("npsn")
	npsnInt, err := strconv.Atoi(npsn)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "npsn is required",
		})
	}

	propinsi := ctx.FormValue("propinsi")
	if propinsi == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "propinsi is required",
		})
	}

	kabupaten := ctx.FormValue("kabupaten")
	if kabupaten == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "kabupaten is required",
		})
	}

	kecamatan := ctx.FormValue("kecamatan")
	if kecamatan == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "kecamatan is required",
		})
	}

	bentuk := ctx.FormValue("bentuk")
	if bentuk == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "bentuk is required",
		})
	}

	sekolah := ctx.FormValue("sekolahs")
	if sekolah == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "sekolah is required",
		})
	}

	status := ctx.FormValue("status")
	if status == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "status is required",
		})
	}

	school := models.Sekolah_Sma{
		Npsn:           npsnInt,
		Propinsi:       propinsi,
		Kabupaten_kota: kabupaten,
		Kecamatan:      kecamatan,
		Bentuk:         bentuk,
		Sekolah:        sekolah,
		Status:         status,
	}

	fmt.Println("Saving to DB:", school)

	database.DB.Create(&school)

	return ctx.JSON(school)
}

func IndexSekolah(ctx *fiber.Ctx) error {
	var school []models.Sekolah_Sma

	database.DB.Find(&school)

	if len(school) == 0 {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "school not found",
		})
	}

	return ctx.JSON(school)
}

func ShowSekolah(ctx *fiber.Ctx) error {
	SekolahIDStr := ctx.Params("id")

	var sekolah models.Sekolah_Sma

	err := database.DB.Model(&sekolah).
		Select("npsn, propinsi, kabupaten_kota, kecamatan, bentuk, sekolah, status").
		Where("id = ?", SekolahIDStr).
		First(&sekolah).Error

	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Sekolah not found",
		})
	}

	response := fiber.Map{
		"npsn":           sekolah.Npsn,
		"propinsi":       sekolah.Propinsi,
		"kabupaten_kota": sekolah.Kabupaten_kota,
		"kecamatan":      sekolah.Kecamatan,
		"bentuk":         sekolah.Bentuk,
		"sekolah":        sekolah.Sekolah,
		"status":         sekolah.Status,
	}

	return ctx.JSON(response)
}

func UpdateSekolah(ctx *fiber.Ctx) error {
	SekolahIDStr := ctx.Params("id")

	var sekolah models.Sekolah_Sma

	result := database.DB.Where("id = ?", SekolahIDStr).First(&sekolah)
	if result.RowsAffected == 0 {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Sekolah not found",
		})
	}

	npsn := ctx.FormValue("npsn")
	npsnInt, err := strconv.Atoi(npsn)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "npsn is required",
		})
	}

	propinsi := ctx.FormValue("propinsi")
	if propinsi == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "propinsi is required",
		})
	}

	kabupaten := ctx.FormValue("kabupaten")
	if kabupaten == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "kabupaten is required",
		})
	}

	kecamatan := ctx.FormValue("kecamatan")
	if kecamatan == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "kecamatan is required",
		})
	}

	bentuk := ctx.FormValue("bentuk")
	if bentuk == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "bentuk is required",
		})
	}

	sekolahs := ctx.FormValue("sekolahs")
	if sekolahs == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "sekolahs is required",
		})
	}

	status := ctx.FormValue("status")
	if status == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "status is required",
		})
	}

	updateResult := database.DB.Model(&models.Sekolah_Sma{}).Where("id = ?", SekolahIDStr).Updates(models.Sekolah_Sma{
		Npsn:           npsnInt,
		Propinsi:       propinsi,
		Kabupaten_kota: kabupaten,
		Kecamatan:      kecamatan,
		Bentuk:         bentuk,
		Sekolah:        sekolahs,
		Status:         status,
	})

	if updateResult.Error != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error Updating",
			"error":   updateResult.Error.Error(),
		})
	}

	return ctx.JSON(fiber.Map{
		"message": "Sekolah updated successfully",
		"sekolah": sekolah,
	})

}

func DeleteSekolah(ctx *fiber.Ctx) error {
	SekolahStr := ctx.Params("id")

	var sekolah models.Sekolah_Sma

	database.DB.Where("id = ?", SekolahStr).First(&sekolah)

	if SekolahStr != sekolah.ID {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Sekolah not found",
		})
	}

	if err := database.DB.Where("id = ?", SekolahStr).Delete(&models.Sekolah_Sma{}).Error; err != nil {
		fmt.Println("Delete Error:", err)
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to Delete Table",
		})
	}

	return ctx.JSON(fiber.Map{
		"message": "Sekolahs deleted successfully",
	})
}
