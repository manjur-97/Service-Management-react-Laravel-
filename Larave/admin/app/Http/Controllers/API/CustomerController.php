<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\Customer;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\Paginator;
class CustomerController extends Controller{
	public function index(){
		$customers = Customer::all();
		
		return response()->json($customers);
	}
	public function create(){
		return view("pages.erp.customer.create",[]);
	}
	public function store(Request $request){
		//Customer::create($request->all());
		$customer = new Customer;
		$customer->id=$request->id;
		$customer->name=$request->name;
		$customer->mobile=$request->mobile;
		$customer->district_id=$request->district_id;
date_default_timezone_set("Asia/Dhaka");
		$customer->created_at=date('Y-m-d H:i:s');
date_default_timezone_set("Asia/Dhaka");
		$customer->updated_at=date('Y-m-d H:i:s');

		$customer->save();

		return back()->with('success', 'Created Successfully.');
	}
	public function show($id){
		$customer = Customer::find($id);
		return response()->json($customer);
	}
	public function edit(Customer $customer){
		return view("pages.erp.customer.edit",["customer"=>$customer,]);
	}
	public function update(Request $request,Customer $customer){
		//Customer::update($request->all());
		$customer = Customer::find($customer->id);
		$customer->id=$request->id;
		$customer->name=$request->name;
		$customer->mobile=$request->mobile;
		$customer->district_id=$request->district_id;
date_default_timezone_set("Asia/Dhaka");
		$customer->created_at=date('Y-m-d H:i:s');
date_default_timezone_set("Asia/Dhaka");
		$customer->updated_at=date('Y-m-d H:i:s');

		$customer->save();

		return redirect()->route("customers.index")->with('success','Updated Successfully.');
	}
	public function destroy($id){
		$resource=Customer::find($id);
		$resource->delete();
		return json_encode(["success"=>"Successfully id: $id deleted"]);
	
	}
}
