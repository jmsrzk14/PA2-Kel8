package models

import (
	"time"

	"github.com/go-playground/validator/v10"
)

type T_Siswa struct {
	Username       string      `json:"username" validate:"required" gorm:"not null"`
	Password       string      `json:"password" validate:"required" gorm:"default:null"`
	No_UTBK        *int        `json:"no_utbk" gorm:"default:null"`
	NISN           *int        `json:"nisn" gorm:"default:null"`
	First_Name     string      `json:"first_name" gorm:"not null"`
	Last_Name      *string     `json:"last_name" gorm:"default:null"`
	Sekolah        string      `json:"sekolah"`
	Asal_Sekolah   string      `json:"asal_sekolah" gorm:"type:char(100)"`
	Sekolah_Sma    Sekolah_Sma `gorm:"foreignKey:Asal_Sekolah" json:"sekolah_sma"`
	Kelompok_Ujian string      `json:"kelompok_ujian" gorm:"type:enum('SAINTEK', 'SOSHUM', 'CAMPURAN');not null" validate:"required,oneof=SAINTEK SOSHUM CAMPURAN"`
	Kelas          *string     `json:"kelas" gorm:"default:null"`
	Grade          *string     `json:"grade" gorm:"type:enum('A', 'B', 'C', 'LULUS', 'SUPERINTENSIF', 'TIDAK TES');default:'TIDAK TES'" validate:"required,oneof=A B C LULUS SUPERINTENSIF TIDAK TES"`
	Telp1          string      `json:"telp1" gorm:"not null"`
	Telp2          *string     `json:"telp2" gorm:"default:null"`
	Email          *string     `json:"email" gorm:"default:null"`
	Group1         *string     `json:"group1" gorm:"default:null"`
	Cohort1        *string     `json:"cohort1" gorm:"default:null"`
	CreatedAt      time.Time   `gorm:"autoCreateTime;default:null" json:"created_at"`
	CreatedBy      *int        `json:"created_by" gorm:"default:null"`
	UpdatedAt      time.Time   `gorm:"autoUpdateTime;default:null" json:"updated_at"`
	UpdatedBy      *int        `json:"updated_by" gorm:"default:null"`
	Active         *int        `json:"active,omitempty" gorm:"column:active;default:0"`
	Status         *int        `json:"status" gorm:"default:0"`
	Status_KPJ     *int        `json:"status_kpj" gorm:"default:0"`

	Pilihan1_UTBK        *string `json:"pilihan1_utbk" gorm:"default:null;type:char(100)"`
	Pilihan2_UTBK        *string `json:"pilihan2_utbk" gorm:"default:null;type:char(100)"`
	Pilihan1_UTBK_Aktual *string `json:"pilihan1_utbk_aktual" gorm:"default:null;type:char(100)"`
	Pilihan2_UTBK_Aktual *string `json:"pilihan2_utbk_aktual" gorm:"default:null;type:char(100)"`

	Prodi1       T_Prodi `gorm:"foreignKey:Pilihan1_UTBK" json:"prodi1"`
	Prodi2       T_Prodi `gorm:"foreignKey:Pilihan2_UTBK" json:"prodi2"`
	Prodi1Aktual T_Prodi `gorm:"foreignKey:Pilihan1_UTBK_Aktual" json:"prodi1_aktual"`
	Prodi2Aktual T_Prodi `gorm:"foreignKey:Pilihan2_UTBK_Aktual" json:"prodi2_aktual"`
}

func (t_siswa *T_Siswa) ValidateTSiswa() error {
	validate := validator.New()
	return validate.Struct(t_siswa)
}
