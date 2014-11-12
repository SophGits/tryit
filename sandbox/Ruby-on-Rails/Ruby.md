### Michael Hartl exercises

#### Chapter 4
##### Shuffle a string by 1) passing in a string as an arg, and 2) defining it on the String class

#### 1
```
def string_shuffle(s)
  s.split('').shuffle.join
end
```
#### 2
```
class String
  def shuffle
    self.split('').shuffle.join
  end
end
```
---

##### Create three hashes called person1, person2, and person3, with first and last names under the keys :first and :last. Then create a params hash so that params[:father] is person1, params[:mother] is person2, and params[:child] is person3. Verify that, for example, params[:father][:first] has the right value.
```
Method 1

person1 = {:first_name => 'Bob', :last_name => 'Loblaw'}
person2 = {:first_name => 'Mary', :last_name => 'Jane'}
person3 = {:first_name => 'Junior', :last_name => 'Kid'}

params ={}
params[:father] = {:first_name => 'Bob', :last_name => 'Loblaw'}


Method 2

person2 = {:first_name => 'Mary', :last_name => 'Jane'}
=> {:first_name=>"Mary", :last_name=>"Jane"}
params = {}
=> {}
params[:mother] = person2
=> {:first_name=>"Mary", :last_name=>"Jane"}
params[:mother][:first_name]
=> "Mary"
```