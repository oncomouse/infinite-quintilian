require "nokogiri"

Dir.glob("*.xml").each do |xml_file|
	xml_document = Nokogiri::XML(File.open(xml_file))
	
	xml_document.search("quote").remove
	xml_document.search("head").remove
	xml_document.search("opener").remove
	xml_document.search("foreign").remove
	xml_document.search("pb").remove
	xml_document.css("milestone[unit!=chapter]").remove
	#xml_document.search("milestone").remove
	xml_document.search("note").remove
	
	book_counter = 1
	xml_content = xml_document.xpath("//div1")
	xml_content.each do |xml_book|
		#txt_file = "txt/" + xml_file.sub(/\.xml/,"") + "-#{book_counter}.txt"
		#xml_book_content = xml_book.xpath("//p")
		chapter_counter = 1
		chapters = xml_book.to_s.split(/<milestone unit=\"chapter\".*\/>/)
		chapters.shift
		chapters.each do |chapter|
			txt_file = "txt/" + xml_file.sub(/\.xml/,"") + "-#{book_counter}-#{chapter_counter}.txt"
			txt_content = chapter.to_s.gsub(/<\/{0,1}p>/," ").gsub(/\s\s+/," ").gsub(/<\/{0,1}hi[^>]*>/,"").gsub(/[^\w\s.,;'-]/,"").gsub(/\n+/,"\n")
			File.write(txt_file, txt_content)
			chapter_counter += 1
		end
#		xml_book_content.each do |paragraph|
#			next if paragraph.to_s =~ /This text may be freely distributed/
#			txt_content += paragraph
#		end

		book_counter += 1
		
	end
end
