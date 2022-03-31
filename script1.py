# Python3 program for reverse geocoding.
 
# importing necessary libraries
import reverse_geocoder as rg
import sys

 
def reverseGeocode(coordinates):
    result = rg.search(coordinates)
    return " | "+result[0]["name"]+", "+result[0]["admin1"]
    



print(reverseGeocode((sys.argv[1],sys.argv[2])))
sys.stdout.flush()