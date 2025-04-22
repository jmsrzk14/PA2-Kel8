package models

import (
	"time"

	"github.com/go-playground/validator/v10"
)

type Sekolah_Sma struct {
	ID              string    `json:"id" gorm:"type:char(100);primaryKey"`
	Npsn            int       `json:"npsn" gorm:"not null;default: 0"`
	Propinsi        string    `json:"propinsi" gorm:"not null"`
	Kabupaten_kota  string    `json:"kabupaten_kota" gorm:"not null"`
	Kecamatan       string    `json:"kecamatan" gorm:"not null"`
	Bentuk          string    `json:"bentuk" gorm:"not null"`
	Sekolah         string    `json:"sekolah" gorm:"not null"`
	Status          string    `json:"status" gorm:"not null"`
	CreatedAt       time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt       time.Time `gorm:"default:CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP" json:"updated_at"`
}

func (sekolah_sma *Sekolah_Sma) ValidateSekolahSma() error {
	validate := validator.New()
	return validate.Struct(sekolah_sma)
}