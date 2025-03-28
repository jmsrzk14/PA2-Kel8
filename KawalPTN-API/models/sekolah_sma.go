package models

import (
	"time"

	"github.com/go-playground/validator/v10"
)

type Sekolah_Sma struct {
	ID              string    `json:"id" gorm:"type:char(100);primaryKey"`
	Npsn            int       `json:"npsn" gorm:"not null;default: 0"`
	Kode_prop       int       `json:"kode_prop" gorm:"not null;default: 0"`
	Propinsi        string    `json:"propinsi" gorm:"not null"`
	Kode_kab_kota   int       `json:"kode_kab_kota" gorm:"not null;default: 0"`
	Kabupaten_kota  string    `json:"kabupaten_kota" gorm:"not null"`
	Kode_kec        int       `json:"kode_kec" gorm:"not null;default: 0"`
	Kecamatan       string    `json:"kecamatan" gorm:"not null"`
	Bentuk          string    `json:"bentuk" gorm:"not null"`
	Sekolah         string    `json:"sekolah" gorm:"not null"`
	Status          string    `json:"status" gorm:"not null"`
	Alamat_jalan    *string   `json:"alamat_jalan" gorm:"default: null"`
	Lintang         *float64  `json:"lintang" gorm:"default:null"`
	Bujur           *float64  `json:"bujur" gorm:"default:null"`
	Jumlah_siswa_lk *int      `json:"jumlah_siswa_lk" gorm:"default:null"`
	Jumlah_siswa_pr *int      `json:"jumlah_siswa_pr" gorm:"default:null"`
	CreatedAt       time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt       time.Time `gorm:"default:CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP" json:"updated_at"`
}

func (sekolah_sma *Sekolah_Sma) ValidateSekolahSma() error {
	validate := validator.New()
	return validate.Struct(sekolah_sma)
}
