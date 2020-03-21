class Api::TransactionsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
       @transaction = Transaction.new(transaction_params);
       @transaction.save 
    end

    def index
        @transactions = Transaction.all
        render "api/transactions/index"
    end

    private

    def transaction_params
        params.permit(:user_id, :transactionType, :quantity, :price, :stock)
    end
end
