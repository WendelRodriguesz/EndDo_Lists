class Api::SearchController < ApplicationController
  def index
    query = params[:query]

    # Busca nas listas (considerando o título)
    lists = List.where("title ILIKE ?", "%#{query}%")

    # Busca nos itens (considerando título, descrição ou categoria)
    items = Item.where(
      "title ILIKE ? OR description ILIKE ? OR category ILIKE ?",
      "%#{query}%", "%#{query}%", "%#{query}%"
    )

    render json: { lists: lists, items: items }
  end
end
