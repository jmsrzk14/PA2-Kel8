package controllers

import (
	"KawalPTN-API/database"
	"KawalPTN-API/models"
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func CreateStudent(ctx *fiber.Ctx) error {
	fmt.Println("Received request:", ctx.FormValue("name"), ctx.FormValue("total"), ctx.FormValue("active"), ctx.FormValue("price"))
	username := ctx.FormValue("username")
	if username == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "username is required",
		})
	}

	no_utbk := ctx.FormValue("no_utbk")
	no_utbkInt, err := strconv.Atoi(no_utbk)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "no_utbk must be a valid integer",
		})
	}

	nisn := ctx.FormValue("nisn")
	nisnInt, err := strconv.Atoi(nisn)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "nisn is required",
		})
	}

	first_name := ctx.FormValue("first_name")
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "first_name is required",
		})
	}

	student := models.T_Siswa{
		Username:   username,
		No_UTBK:    &no_utbkInt,
		NISN:       &nisnInt,
		First_Name: first_name,
	}

	fmt.Println("Saving to DB:", student)

	database.DB.Create(&student)

	return ctx.JSON(student)
}

func IndexStudent(ctx *fiber.Ctx) error {
	var student []models.T_Siswa

	database.DB.Find(&student)

	if len(student) == 0 {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Student not found",
		})
	}

	return ctx.JSON(student)
}

func ShowStudent(ctx *fiber.Ctx) error {
	StudentIDStr := ctx.Params("username")

	// Struct untuk menyimpan data siswa
	var student models.T_Siswa

	// Ambil data siswa dari database tanpa preload sekolah
	err := database.DB.Model(&student).
		Select("username, active, nisn, first_name, last_name, no_utbk, pilihan1_utbk, pilihan2_utbk, pilihan1_utbk_aktual, pilihan2_utbk_aktual, kelompok_ujian, asal_sekolah").
		Where("username = ?", StudentIDStr).
		First(&student).Error

	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Student not found",
		})
	}

	fmt.Printf("Data dari database: %+v\n", student)

	var school struct {
		Sekolah string `json:"nama_sekolah"`
	}

	err = database.DB.Table("sekolah_smas").
		Select("sekolah").
		Where("id = ?", student.Asal_Sekolah).
		First(&school).Error

	if err != nil {
		school.Sekolah = "Tidak Diketahui"
	}

	var prodi1 struct {
		Prodi1 string `json:"nama_prodi1"`
	}

	err = database.DB.Table("t_prodis").
		Select("nama_prodi_ptn").
		Where("id_prodi = ?", student.Pilihan1_UTBK).
		First(&prodi1).Error

	if err != nil {
		prodi1.Prodi1 = "Tidak Diketahui"
	}

	// Buat respons JSON dengan tambahan nama sekolah
	response := fiber.Map{
		"username":             student.Username,
		"first_name":           student.First_Name,
		"last_name":            student.Last_Name,
		"nisn":                 student.NISN,
		"active":               student.Active,
		"no_utbk":              student.No_UTBK,
		"kelompok_ujian":       student.Kelompok_Ujian,
		"nama_prodi1":          prodi1.Prodi1,
		"pilihan2_utbk":        student.Pilihan2_UTBK,
		"pilihan1_utbk_aktual": student.Pilihan1_UTBK_Aktual,
		"pilihan2_utbk_aktual": student.Pilihan2_UTBK_Aktual,
		"nama_sekolah":         school.Sekolah,
	}

	return ctx.JSON(response)
}

func UpdateStudent(ctx *fiber.Ctx) error {
	packetIDStr := ctx.Params("id")

	packetID, err := strconv.Atoi(packetIDStr)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid packet ID",
		})
	}

	var packet models.T_Paket

	database.DB.Where("id = ?", packetID).First(&packet)

	if packetID != int(packet.ID) {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Product not found",
		})
	}

	name := ctx.FormValue("name")
	if name == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "name is required",
		})
	}

	total := ctx.FormValue("total")
	totalInt, err := strconv.Atoi(total)
	if total == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "total is required",
		})
	}

	active := ctx.FormValue("active")
	activeInt, err := strconv.Atoi(active)
	if active == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "active is required",
		})
	}

	price := ctx.FormValue("price")
	priceInt, err := strconv.Atoi(price)
	if price == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "price is required",
		})
	}

	result := database.DB.Model(&packet).Updates(models.T_Paket{
		Nama_Paket: name,
		Total:      totalInt,
		Active:     activeInt,
		Price:      priceInt,
	})
	if result.Error != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error Updating",
			"error":   result.Error.Error(),
		})
	}

	return ctx.JSON(packet)

}

func DeleteStudent(ctx *fiber.Ctx) error {
	studentUsernameStr := ctx.Params("username")

	var student models.T_Siswa

	database.DB.Where("username = ?", studentUsernameStr).First(&student)

	if studentUsernameStr != student.Username {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Student not found",
		})
	}

	if err := database.DB.Where("username = ?", studentUsernameStr).Delete(&models.T_Siswa{}).Error; err != nil {
		fmt.Println("Delete Error:", err)
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to Delete Table",
		})
	}

	return ctx.JSON(fiber.Map{
		"message": "Students deleted successfully",
	})
}
