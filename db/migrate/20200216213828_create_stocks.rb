class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :name, null: false
      t.integer :quantity, null: false
      t.timestamps
    end
      add_index :stocks, :name
  end
end
