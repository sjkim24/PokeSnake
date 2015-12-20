a = [1,2,3]

def add_two_map(array)
  array.map { |int| puts int + 1 }
end

def add_two_each(array)
  array.each { |int|  int + 1 }
end

p add_two_each(a)

def my_map(array, &blk)
  new_array = []
  array.each do |el|
    new_array << blk.call(el)
  end
  return new_array
end

def my_each (array, &blk)
  for index in 0..array.count - 1
    blk.call(array[index])
  end

  return array
end
