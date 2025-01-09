class ItemsController < ApplicationController
  before_action :set_list

  def index
    items = @list.items
    render json: items
  end

  def create
    item = @list.items.new(item_params)
    if item.save
      render json: item, status: :created
    else
      render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    item = @list.items.find(params[:id])
    if item.update(item_params)
      render json: item
    else
      render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    item = @list.items.find(params[:id])
    item.destroy
    render json: { message: "Item deletado com sucesso!" }
  end

  private

  def set_list
    @list = List.find(params[:list_id])
  end

  def item_params
    params.require(:item).permit(:title, :description, :completed, :category, :due_date)
  end
end
