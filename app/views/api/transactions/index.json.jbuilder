@transactions.each do |transaction|
    json.set! transaction.id do
        json.extract! transaction, :id, :transactionType, :stock, :price, :quantity, :created_at, :user_id
    end
end