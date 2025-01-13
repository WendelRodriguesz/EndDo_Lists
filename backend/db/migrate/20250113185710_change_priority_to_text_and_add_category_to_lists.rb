class ChangePriorityToTextAndAddCategoryToLists < ActiveRecord::Migration[7.0]
  def change
    # Alterar o tipo de coluna prioridade para texto
    change_column :lists, :priority, :string

    # Adicionar a nova coluna categoria
    add_column :lists, :category, :string
  end
end
