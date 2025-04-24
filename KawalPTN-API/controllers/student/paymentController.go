package controllers

import (
	"KawalPTN-API/database"
	"KawalPTN-API/models"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func SendPayment(ctx *fiber.Ctx) error {
	order_id := ctx.FormValue("order_id")
	if order_id == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "order_id is required",
		})
	}

	id_paket := ctx.FormValue("id_paket")
	id_paketInt, err := strconv.Atoi(id_paket)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "id_paket is required",
		})
	}

	amount := ctx.FormValue("amount")
	amountInt, err := strconv.Atoi(amount)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "amount is required",
		})
	}

	id_users := ctx.FormValue("id_users")
	id_usersInt, err := strconv.Atoi(id_users)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "id_users is required",
		})
	}

	payment := models.Payment{
		Id:      order_id,
		IdPaket: uint(id_paketInt),
		Harga:   amountInt,
		IdSiswa: uint(id_usersInt),
	}

	fmt.Println("Saving to DB:", payment)

	database.DB.Create(&payment)

	return ctx.JSON(payment)
}

func IndexAnnouncement(ctx *fiber.Ctx) error {
	var announcement []models.Pengumuman

	database.DB.Find(&announcement)

	if len(announcement) == 0 {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "announcement not found",
		})
	}

	return ctx.JSON(announcement)
}

func ShowAnnouncement(ctx *fiber.Ctx) error {
	AnnouncementIDStr := ctx.Params("id")

	var announcement models.Pengumuman

	err := database.DB.Model(&announcement).
		Select("judul, deskripsi, id_users").
		Where("id = ?", AnnouncementIDStr).
		First(&announcement).Error

	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Announcement not found",
		})
	}

	response := fiber.Map{
		"judul":     announcement.Judul,
		"deskripsi": announcement.Deskripsi,
		"id_users":  announcement.IdUsers,
	}

	return ctx.JSON(response)
}

func UpdateAnnouncement(ctx *fiber.Ctx) error {
	AnnouncementIDStr := ctx.Params("id")

	var announcement models.Pengumuman

	result := database.DB.Where("id = ?", AnnouncementIDStr).First(&announcement)
	if result.RowsAffected == 0 {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Announcement not found",
		})
	}

	judul := ctx.FormValue("judul")
	if judul == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "judul is required",
		})
	}

	deskripsi := ctx.FormValue("deskripsi")
	if deskripsi == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "deskripsi is required",
		})
	}

	updateResult := database.DB.Model(&models.Pengumuman{}).Where("id = ?", AnnouncementIDStr).Updates(models.Pengumuman{
		Judul:     judul,
		Deskripsi: deskripsi,
	})

	if updateResult.Error != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error Updating",
			"error":   updateResult.Error.Error(),
		})
	}

	return ctx.JSON(fiber.Map{
		"message":      "Announcement updated successfully",
		"announcement": announcement,
	})

}

func DeleteAnnouncement(ctx *fiber.Ctx) error {
	announcementIDStr := ctx.Params("id")

	announcementID, err := strconv.Atoi(announcementIDStr)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid announcement ID",
		})
	}

	var announcement models.Pengumuman

	database.DB.Where("id = ?", announcementID).First(&announcement)

	if announcementID != int(announcement.Id) {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Announcement not found",
		})
	}

	if err := database.DB.Delete(&announcement).Error; err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to Delete Table",
		})
	}

	return ctx.JSON(fiber.Map{
		"message": "Announcement deleted successfully",
	})
}
