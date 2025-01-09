class CreateLists < ActiveRecord::Migration[8.0]
  def change
    create_table :lists do |t|
      t.string :title
      t.integer :priority
      t.boolean :completed

      t.timestamps
    end
  end
end
