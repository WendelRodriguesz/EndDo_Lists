class List < ApplicationRecord
  has_many :items, dependent: :destroy

  validates :title, presence: true, length: { maximum: 50 }
  validates :completed, inclusion: { in: [true, false] }
  validates :priority, length: { maximum: 20 }, allow_blank: true
  validates :category, length: { maximum: 50 }, allow_blank: true

  # Callbacks
  after_create_commit :initialize_item_count
  after_save :update_item_count
  after_save :update_list_status

  private

  def initialize_item_count
    update_column(:item_count, items.count)
  end

  # Atualiza o item_count após alterações
  def update_item_count
    update_column(:item_count, items.count)
  end

  # Atualiza o status `completed` da lista com base nos itens
  def update_list_status
    if items.empty?
      update_column(:completed, false) 
    elsif items.exists?(completed: false)
      update_column(:completed, false) 
    else
      update_column(:completed, true) 
    end
  end
end
