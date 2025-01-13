class Item < ApplicationRecord
  belongs_to :list

  validates :title, presence: true, length: { minimum: 3 }
  validates :due_date, presence: true
  validates :completed, inclusion: { in: [true, false] }
end
