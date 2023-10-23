# TODO
#   Add distortion and fbm to the noise textures
#   Finish gem pipeline
#   


"""
First the user would enter a seed value in html, then js would use this seed value into a number in base 36

the seed value will first be used to call a switch statement in the js code that will determine the geometry used for the gem

"""
def Base36(seed):
    return int(seed,36)

seed = "Mommy"
print("The seed "+ str(seed)+ " Is")


seed = (Base36(seed))
print(seed)
def geo(seed):
    x= ("Its a ")
    geo = (seed % 7)
    match geo:
        case 0:
            return(x+ "cupola")
        case 1:
            return(x+ "Cube")
        case 2:
            return(x+ "Pyramid")
        case 3:
            return(x+ "sphere")
        case 4:
            return(x+ "truncated Cube")
        case 5:
            return(x+ "octohedron")
        case 6:
            return(x+ "torus")
        case 7:
            return(x+ "square antprism")
        case 8:
            return(x+ "triagonal bipyramid")

        case other:
            return(other)
print(geo(seed))

"""
the seed value would then be used to get a set amount of uniforms to bring into the shader
-- possible uniforms
-for color i believe the amount should be between 1 and 3, and that part of the seed should determine that and that the colors will be passed in as uniforms
- binary string for if statements

with this it opens the possibility of levels of heirarchy in characteristics and in that, rarity
we can have 12 possible categories, 3 of them can be metacategories that allow other categories to happen
ie 2 categories can be a striped texture or a noise texture.
a metacategory could choose if it would display one of these textures, or a blend of both
^
the issue with multicategories is that if i were to pass a binary string the multicategories would have to be in very specific cases of the 

since seeds are input by the user, we can assume that they have a high level of randomness since there is a high level of entropy

list of metacategories
- amount of colors present in gemstones
    - color ramp positions

- amount of textures present in gemstones


list of categories
color ramp positions

https://www.cs.utexas.edu/~theshark/courses/cs354/lectures/cs354-21.pdf


the shader would then call multiple if statements to see what charecteristics of the gem will be passed into the gem

// characteristics of the gem
- shape
- color
-texture
    - banding
    - noise
- roughness
"""


seed = "Hello"


    