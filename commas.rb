def commas(number)
	number =number.to_s
	if number.length<4
		return number 
	elsif number.length>3
		1.upto(number.length) do |i|
			a=3
			return number.insert(number[a],',')
			
		end
	end
end
puts commas(1000)
puts commas(10000)