class ListsController < ApplicationController
  def index
    lists = List.all
    render json: lists
  end

  def create
    list = List.new(list_params)
    if list.save
      render json: list, status: :created
    else
      render json: { errors: list.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    list = List.find(params[:id])
    list.destroy
    render json: { message: "Lista deletada com sucesso!" }
  end

  private

  def list_params
    params.require(:list).permit(:title)
  end
end
