export PATH  := node_modules/.bin:$(PATH)

all:backup

backup:
	@cp -r data ~/Documents/Work/data
	@cp -r races ~/Documents/Work/races

	@echo ">>> Backed up data/races folder..."

clean:
	@rm -rf data
	@echo ">>> Removed data folder..."

.PHONY: all backup clean
