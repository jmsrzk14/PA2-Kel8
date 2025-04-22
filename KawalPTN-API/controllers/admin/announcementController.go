package controllers

import (
	"KawalPTN-API/database"
	"KawalPTN-API/models"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func CreateAnnouncement(ctx *fiber.Ctx) error {
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

	id_users := ctx.FormValue("id_users")
	id_usersInt, err := strconv.Atoi(id_users)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "id_users is required",
		})
	}

	announcement := models.Pengumuman{
		Judul:     judul,
		Deskripsi: deskripsi,
		IdUsers:   uint(id_usersInt),
	}

	fmt.Println("Saving to DB:", announcement)

	database.DB.Create(&announcement)

	return ctx.JSON(announcement)
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
