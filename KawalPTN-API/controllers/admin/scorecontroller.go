package controllers

import (
	"KawalPTN-API/database"
	"KawalPTN-API/models"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func CreateScore(ctx *fiber.Ctx) error {
	id_siswa := ctx.FormValue("id_siswa")
	id_siswaInt, err := strconv.Atoi(id_siswa)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "id_siswa is required",
		})
	}

	id_courses := ctx.FormValue("id_courses")
	id_coursesInt, err := strconv.Atoi(id_courses)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "id_courses must be a valid integer",
		})
	}

	year := ctx.FormValue("year")
	yearInt, err := strconv.Atoi(year)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "year is required",
		})
	}

	pu := ctx.FormValue("pu")
	puInt, err := strconv.Atoi(pu)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "pu is required",
		})
	}

	ppu := ctx.FormValue("ppu")
	ppuInt, err := strconv.Atoi(ppu)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "ppu is required",
		})
	}

	pbm := ctx.FormValue("pbm")
	pbmInt, err := strconv.Atoi(pbm)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "pbm is required",
		})
	}

	pk := ctx.FormValue("pk")
	pkInt, err := strconv.Atoi(pk)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "pk is required",
		})
	}

	lbi := ctx.FormValue("lbi")
	lbiInt, err := strconv.Atoi(lbi)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "lbi is required",
		})
	}

	lbe := ctx.FormValue("lbe")
	lbeInt, err := strconv.Atoi(lbe)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "lbe is required",
		})
	}

	pm := ctx.FormValue("pm")
	pmInt, err := strconv.Atoi(pm)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "pm is required",
		})
	}

	total := float64(puInt+ppuInt+pbmInt+pkInt+lbiInt+lbeInt+pmInt) / 7.0

	Score := models.T_Nilai{
		Id_Siswa: uint(id_siswaInt),
		Id_Paket: uint(id_coursesInt),
		Year:     yearInt,
		Pu:       puInt,
		Ppu:      ppuInt,
		Pbm:      pbmInt,
		Pk:       pkInt,
		Lbi:      lbiInt,
		Lbe:      lbeInt,
		Pm:       pmInt,
		Total:    int(total),
	}

	fmt.Println("Saving to DB:", Score)

	database.DB.Create(&Score)

	return ctx.JSON(Score)
}

func ShowScore(ctx *fiber.Ctx) error {
	idSiswa := ctx.Params("id_siswa")

	var scores []models.T_Nilai

	err := database.DB.
		Select("id_siswa, id_paket, year, total, pu, ppu, pbm, pk, lbi, lbe, pm").
		Where("id_siswa = ?", idSiswa).
		Find(&scores).Error

	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Gagal mengambil data nilai",
		})
	}

	if len(scores) == 0 {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Tidak ada nilai ditemukan untuk siswa ini",
		})
	}

	groupedByYear := make(map[string]fiber.Map)

	for _, score := range scores {
		yearStr := strconv.Itoa(score.Year)
		groupedByYear[yearStr] = fiber.Map{
			"pu":    score.Pu,
			"ppu":   score.Ppu,
			"pbm":   score.Pbm,
			"pk":    score.Pk,
			"lbi":   score.Lbi,
			"lbe":   score.Lbe,
			"pm":    score.Pm,
			"total": score.Total,
		}
	}

	return ctx.JSON(groupedByYear)
}


// func UpdateScore(ctx *fiber.Ctx) error {
// 	ScoreIDStr := ctx.Params("username")

// 	var Score models.T_Nilai

// 	result := database.DB.Where("username = ?", ScoreIDStr).First(&Score)
// 	if result.RowsAffected == 0 {
// 		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
// 			"message": "Score not found",
// 		})
// 	}

// 	first_name := ctx.FormValue("first_name")
// 	if first_name == "" {
// 		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 			"message": "first_name is required",
// 		})
// 	}

// 	no_utbk := ctx.FormValue("no_utbk")
// 	no_utbkInt, err := strconv.Atoi(no_utbk)
// 	if err != nil {
// 		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 			"message": "no_utbk must be a number",
// 		})
// 	}

// 	nisn := ctx.FormValue("nisn")
// 	nisnInt, err := strconv.Atoi(nisn)
// 	if err != nil {
// 		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 			"message": "nisn must be a number",
// 		})
// 	}

// 	grade := ctx.FormValue("grade")
// 	if grade == "" {
// 		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 			"message": "grade is required",
// 		})
// 	}

// 	updateResult := database.DB.Model(&models.T_Nilai{}).Where("username = ?", ScoreIDStr).Updates(models.T_Nilai{
// 		First_Name: first_name,
// 		No_UTBK:    &no_utbkInt,
// 		NISN:       &nisnInt,
// 		Grade:      &grade,
// 	})

// 	if updateResult.Error != nil {
// 		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 			"message": "Error Updating",
// 			"error":   updateResult.Error.Error(),
// 		})
// 	}

// 	return ctx.JSON(fiber.Map{
// 		"message": "Score updated successfully",
// 		"Score":   Score,
// 	})
// }

// func DeleteScore(ctx *fiber.Ctx) error {
// 	ScoreUsernameStr := ctx.Params("username")

// 	var Score models.T_Nilai

// 	database.DB.Where("username = ?", ScoreUsernameStr).First(&Score)

// 	if ScoreUsernameStr != Score.Username {
// 		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
// 			"message": "Score not found",
// 		})
// 	}

// 	if err := database.DB.Where("username = ?", ScoreUsernameStr).Delete(&models.T_Nilai{}).Error; err != nil {
// 		fmt.Println("Delete Error:", err)
// 		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 			"message": "Failed to Delete Table",
// 		})
// 	}

// 	return ctx.JSON(fiber.Map{
// 		"message": "Scores deleted successfully",
// 	})
// }
