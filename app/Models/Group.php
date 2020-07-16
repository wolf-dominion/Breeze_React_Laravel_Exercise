<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $fillable = [
        'group_name'
    ];

    protected $with = ['people'];

    public function people()
    {
        return $this->hasMany(Person::class);
    }
}