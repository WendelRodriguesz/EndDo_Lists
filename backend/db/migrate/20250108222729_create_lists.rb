class CreateLists < ActiveRecord::Migration[8.0]
  def change
    create_table :lists do |t|
      t.string :title
      t.string :completed
      t.string :boolean

      t.timestamps
    end
  end
end
