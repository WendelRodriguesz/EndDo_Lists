class CreateItems < ActiveRecord::Migration[8.0]
  def change
    create_table :items do |t|
      t.string :title
      t.string :description
      t.boolean :completed
      t.string :category
      t.date :due_date
      t.references :list, null: false, foreign_key: true

      t.timestamps
    end
  end
end
