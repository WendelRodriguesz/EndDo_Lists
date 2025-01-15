class Item < ApplicationRecord
  belongs_to :list

  validates :title, presence: true, length: { maximum: 50 }
  validates :due_date, presence: false
  validates :completed, inclusion: { in: [true, false] }

  # Callbacks para atualizar o status da lista
  after_save :update_list_status, unless: :list_destroyed?
  after_destroy :update_list_status, unless: :list_destroyed?

  private

  # Atualiza o status da lista com base nos itens concluídos
  def update_list_status
    return unless list # Verifica se a lista existe
    if list.items.exists?(completed: false)
      list.update_column(:completed, false) 
    else
      list.update_column(:completed, true)
    end
  end

  def list_destroyed?
    list.destroyed? # Verifica se a lista foi destruída
  end
end
