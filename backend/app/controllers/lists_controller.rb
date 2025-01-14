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

  def update
    list = List.find(params[:id])
    if list.update(list_params)
      render json: list
    else
      render json: { errors: list.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    list = List.find(params[:id])
    list.items.destroy_all # Remove os itens associados
    list.destroy # Remove a lista
    render json: { message: "Lista deletada com sucesso!" }
  rescue StandardError => e
    render json: { error: e.message }, status: :internal_server_error
  end

  private

  def list_params
    params.require(:list).permit(:title, :completed, :priority, :category)
  end
end
