<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PersonResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
     public function toArray($request)
 {
     return [
         'id'            => $this->id,
         'group_name'    => $this->group_name,
         'people' => $this->people()->get(),
     ];
 }
}