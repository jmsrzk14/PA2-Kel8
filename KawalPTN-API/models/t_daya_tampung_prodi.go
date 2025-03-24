package models

import (
	"github.com/go-playground/validator/v10"
)

type T_Daya_Tampung_Prodi struct {
	Id_prodi       uint    `json:"id_prodi"`
	T_Prodi        T_Prodi `gorm:"foreignKey:Id_prodi" json:"t_prodi"`
	Tahun          int     `json:"tahun" gorm:"not null"`
	Peringkat      int     `json:"peringkat" gorm:"default: null"`
	Daya_tampung   int     `json:"daya_tampung" gorm:"not null"`
	Peminat        int     `json:"peminat" gorm:"default: null"`
	Rataan         int     `json:"rataan" gorm:"default: null"`
	Simpangan_baku int     `json:"simpangan_baku" gorm:"default: null"`
	Minimum        int     `json:"minimum" gorm:"default: null"`
	Maximum        int     `json:"maximum" gorm:"default: null"`
}

func (t_daya_tampung_prodi *T_Daya_Tampung_Prodi) ValidateTDayaTampungProdi() error {
	validate := validator.New()
	return validate.Struct(t_daya_tampung_prodi)
}
