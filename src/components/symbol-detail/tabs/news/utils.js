function resolveImgUrl(item) {
  item.image_map[0].image_path = `http://112.213.94.77:1995/static/${item.image_map[0].image_path}`
  return item
}

export default resolveImgUrl
