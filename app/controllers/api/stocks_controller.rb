class Api::StocksController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
       @stock = Stock.new(stock_params);
       @stock.save 

       @user = User.find_by(id: params[:user_id])
       newCash = @user[:money] - (params[:quantity].to_i * params[:price].to_f)
       @user.update(money: newCash)

       render "api/users/show"
    end

    def update
        @stock = Stock.all.find_by(user_id: params[:user_id], name: params[:name])
        puts @stock
        newQty = @stock[:quantity].to_i + params[:quantity].to_i
        @stock.update(quantity: newQty)

        @user = User.find_by(id: params[:user_id])
        newCash = @user[:money] - (params[:quantity].to_i * params[:price].to_f)
        @user.update(money: newCash)

        render "api/users/show"
    end

    def destroy
        @stock = Stock.all.find_by(user_id: params[:user_id], name: params[:name])

        @stock.destroy

        @user = User.find_by(id: params[:user_id])
        
        newCash = @user[:money] - (params[:quantity].to_i * params[:price].to_f)
        @user.update(money: newCash)
        
        render "api/users/show"
    end

    private

    def stock_params
        params.permit(:name, :quantity, :user_id, :price)
    end
end
