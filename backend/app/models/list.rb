class List < ApplicationRecord
  has_many :items, dependent: :destroy

  validates :title, presence: true, length: { minimum: 3 }
  validates :completed, inclusion: { in: [true, false] }
  validates :priority, length: { maximum: 20 }, allow_blank: true
  validates :category, length: { maximum: 50 }, allow_blank: true

  # Atualiza item_count sempre que itens são adicionados ou removidos
  after_create_commit :initialize_item_count
  after_save :update_item_count

  private

  def initialize_item_count
    update_column(:item_count, items.count)
  end

  def update_item_count
    update_column(:item_count, items.count)
  end
end
