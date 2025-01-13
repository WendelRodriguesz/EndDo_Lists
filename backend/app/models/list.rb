class List < ApplicationRecord
  has_many :items, dependent: :destroy
  
  validates :title, presence: true, length: { minimum: 3 }
  validates :priority, presence: true
  validates :category, presence: true
end
