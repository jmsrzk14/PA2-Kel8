package models

import (
	"github.com/go-playground/validator/v10"
)

type T_Daya_Tampung_Prodi struct {
	Id           uint    `json:"id"`
	ProdiID      string  `json:"prodi_id" gorm:"type:char(100)"`
	T_Prodi      T_Prodi `gorm:"foreignKey:ProdiID;constraint:OnDelete:CASCADE,OnUpdate:CASCADE;" json:"t_prodi"`
	Tahun        int     `json:"tahun" gorm:"not null"`
	Daya_tampung int     `json:"daya_tampung" gorm:"not null"`
	Peminat      int     `json:"peminat" gorm:"default: null"`
}

func (t_daya_tampung_prodi *T_Daya_Tampung_Prodi) ValidateTDayaTampungProdi() error {
	validate := validator.New()
	return validate.Struct(t_daya_tampung_prodi)
}
