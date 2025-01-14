class ChangeDueDateNullableInItems < ActiveRecord::Migration[7.0]
  def change
    change_column :items, :due_date, :date, null: true
  end
end
