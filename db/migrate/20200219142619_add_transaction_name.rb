class AddTransactionName < ActiveRecord::Migration[5.2]
  def change
    add_column :transactions, :stock, :string
  end
end
