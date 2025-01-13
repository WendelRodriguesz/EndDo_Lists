class AddItemCountToLists < ActiveRecord::Migration[7.0]
  def change
    add_column :lists, :item_count, :integer, default: 0, null: false
  end
end
