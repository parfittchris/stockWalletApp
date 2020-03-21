class ChangeMoneyDataType < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :money, :float
  end
end
