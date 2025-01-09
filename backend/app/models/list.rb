class List < ApplicationRecord
  has_many :items, dependent: :destroy
  
  validates :title, presence: true, length: { minimum: 3 }
  validates :priority, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
