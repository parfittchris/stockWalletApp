class ChangeTransactionColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :transactions, :type, :transactionType
  end
end
