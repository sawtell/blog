---
title:  "Programmatically create commerce orders"
date:   2015-09-20
categories: Drupal
tags: Drupal
---

{% highlight php %}
	<?php
	function create_order($uid) {
	 $product_id = $this->product_id;
	 // Create the new order in checkout; you might also check first to
	 // see if your user already has an order to use instead of a new one.
	 $order = commerce_order_new($user->uid, 'checkout_checkout');
	 // Save the order to get its ID.
	 commerce_order_save($order);
	
	  // Load whatever product represents the item the customer will be
	  // paying for and create a line item for it.
	  $product = commerce_product_load($product_id);
	  $line_item = commerce_product_line_item_new($product, 1, $order->order_id);
	
	  // Set the product to 0 in order to complete order without taking payment.
	  $line_item->commerce_unit_price[LANGUAGE_NONE]['0']['amount'] = 0;
	  $line_item->commerce_unit_price[LANGUAGE_NONE]['0']['data']['components']['0']['price']['amount'] = 0;
	
	  // Save the line item to get its ID.
	  commerce_line_item_save($line_item);
	
	  // Add the line item to the order using fago's rockin' wrapper.
	  $order_wrapper = entity_metadata_wrapper('commerce_order', $order);
	  $order_wrapper->commerce_line_items[] = $line_item;
	
	
	  $billing = $this->get_customer_profile('billing', $user);
	  $customer_profile_billing_array = $this->get_user_profile_info($user);
	  // Set the values in the profile entity and attache it to the order
	  $billing->commerce_customer_address[LANGUAGE_NONE][0] = $customer_profile_billing_array;
	  commerce_customer_profile_save($billing);
	
	  $order->commerce_customer_billing[LANGUAGE_NONE][0]['profile_id'] = $billing->profile_id;

	//  $transaction = commerce_payment_transaction_new('paypal_wps', $order->order_id);
	//  $transaction->instance_id = 'paypal_wps|commerce_payment_paypal_wps';

	  $transaction = commerce_payment_transaction_new('clpe_invoice', $order->order_id);
	  $payment_method = array('instance_id' => 'clpe_invoice|commerce_payment_clpe_invoice');
	  $order->data['payment_method'] = $payment_method['instance_id'];
	
	  commerce_order_save($order);
	
	  try {
	    commerce_checkout_complete($order);
	    commerce_order_status_update($order, 'completed');
	  }
	  catch (Exception $e) {
	    // Log the issue.
	  }
	}
{% endhighlight %}
