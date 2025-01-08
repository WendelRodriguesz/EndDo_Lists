class Item < ApplicationRecord
  belongs_to :list

  validates :title, presence: true, length: { minimum: 3 }
  validates :description, presence: true
  validates :category, presence: true
  validates :due_date, presence: true
end
