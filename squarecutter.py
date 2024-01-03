from PIL import Image

kirby = Image.open("sun.png")


# image is 300px x 300px, this cuts it based on that.
# ideally this is changed to 1/3 instead of an absolute coordinate so that it can work with differently-sized images
box1 = (0, 0, 100, 100)
box2 = (100, 0, 200, 100)
box3 = (200, 0, 300, 100)
box4 = (0, 100, 100, 200)
box5 = (100, 100, 200, 200)
box6 = (200, 100, 300, 200)
box7 = (0, 200, 100, 300)
box8 = (100, 200, 200, 300)
box9 = (200, 200, 300, 300)

boxes = [box1, box2, box3, box4, box5, box6, box7, box8, box9]
i = 1
for box in boxes:
    part = kirby.crop(box)
    i_str = str(i) + ".png"
    part.save(i_str, "PNG")
    i += 1