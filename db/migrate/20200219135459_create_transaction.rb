class CreateTransaction < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.string :type, null: false
      t.float :price, null: false
      t.integer :quantity, null: false
      t.timestamps
    end
  end
end
