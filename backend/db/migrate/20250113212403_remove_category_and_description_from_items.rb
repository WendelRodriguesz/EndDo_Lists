class RemoveCategoryAndDescriptionFromItems < ActiveRecord::Migration[7.0]
  def change
    remove_column :items, :category, :string
    remove_column :items, :description, :string
  end
end
