<template>
  <container>
    <h2 class="title">Overview</h2>

    <p>
      Here’s a quick example to demonstrate most controls. Keep reading 
      for documentation on required components.
    </p>
    <columns>
      <column col=6 xl=8 sm=12>
        <form-group>
          <form-label>Name</form-label>
          <form-input v-model="name" />
        </form-group>
        <form-group>
          <form-label>Email</form-label>
          <form-input 
            v-model="email" 
            type="email" 
            placeholder="example@example.com" 
          />
        </form-group>
        <form-group>
          <form-label>Gender</form-label>
          <form-radio-group v-model="gender" :options="['Male', 'Female']" />
        </form-group>
        <form-group>
          <form-label>Source</form-label>
          <form-select v-model="source" :options="['Slack', 'Skype', 'Hipchat', 'Telegram', 'WhatsApp']" size=3 multiple />
          <form-checkbox v-model="spam" type="switch">Send me emails with news and tips</form-checkbox>
        </form-group>
        <form-group>
          <form-label>Message</form-label>
          <form-textarea v-model="message" />
          <form-checkbox v-model="remember">Remember me</form-checkbox>  
        </form-group>

        <card>
          <h4 slot="header">Your data</h4>
          <p>Name: {{ name }}</p> 
          <p>Email: {{ email }}</p> 
          <p>Gender: {{ gender }}</p>
          <p>Source: {{ source.join(', ') }}</p> 
          <p>Newsletter: {{ spam ? 'yes' : 'no' }}</p>
          <p>Message: {{ message }}</p>
          <p>Remember: {{ remember ? 'yes' : 'no' }}</p>
        </card>

      </column>
    </columns>
    <prism language="html" :code="basicHtml" />

    <h5 class="subtitle">Horizontal</h5>
    <p>
      If you want to have a horizontal form, add the <code>&lt;form-horizontal&gt;</code>
      component. And add the <code>column</code> component to the child elements for 
      responsive form row layout.
    </p>

    <columns gapless>
      <column col=9 sm=12>
        <form-horizontal>
          <form-group>
            <column col=3 sm=12>
              <form-label>Name</form-label>
            </column>
            <column col=9 sm=12>
              <form-input v-model="name" />
            </column>
          </form-group>
          <form-group>
             <column col=3 sm=12>
              <form-label>Email</form-label>
            </column>
            <column col=9 sm=12>
              <form-input 
                v-model="email" 
                type="email" 
                placeholder="example@example.com" 
              />
            </column>
          </form-group>
          <form-group>
            <column col=3 sm=12>
              <form-label>Gender</form-label>
            </column>
            <column col=9 sm=12>
              <form-radio-group v-model="gender" :options="['Male', 'Female']" />
            </column>
          </form-group>
          <form-group>
             <column col=3 sm=12>
              <form-label>Source</form-label>
            </column>
            <column col=9 sm=12>
              <form-select 
                v-model="source" 
                :options="['Slack', 'Skype', 'Hipchat', 'Telegram', 'WhatsApp']" 
                size=3 
                multiple 
              />
              <form-checkbox v-model="spam" type="switch">
                Send me emails with news and tips
              </form-checkbox>
            </column>
          </form-group>
          <form-group>
            <column>
              <form-label>Message</form-label>
            </column>
            <column col=9 sm=12>
              <form-textarea v-model="message" />
              <form-checkbox v-model="remember">Remember me</form-checkbox> 
            </column> 
          </form-group>
        </form-horizontal>
      </column>
    </columns>

    <prism language="html" :code="horizontalHtml" />

  </container>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data: () => ({
    name: '',
    email: '',
    gender: '',
    source: [],
    spam: false,
    remember: false,
    message: '',
    basicHtml: `<form-group>
  <form-label>Name</form-label>
  <form-input v-model="name" />
</form-group>
<form-group>
  <form-label>Email</form-label>
  <form-input
    v-model="email"
    type="email"
    placeholder="example@example.com"
  />
</form-group>
<form-group>
  <form-label>Gender</form-label>
  <form-radio-group v-model="gender" :options="['Male', 'Female']" />
</form-group>
<form-group>
  <form-label>Source</form-label>
  <form-select
    v-model="source"
    :options="['Slack', 'Skype', 'Hipchat', 'Telegram', 'WhatsApp']"
    size=3
    multiple
  />
  <form-checkbox v-model="spam" type="switch">
    Send me emails with news and tips
  </form-checkbox>
</form-group>
<form-group>
  <form-label>Message</form-label>
  <form-textarea v-model="message" />
  <form-checkbox v-model="remember">Remember me</form-checkbox>
</form-group>`,
    horizontalHtml: `<form-horizontal>
  <form-group>
    <column col=3 sm=12>
      <form-label>Name</form-label>
    </column>
    <column col=9 sm=12>
      <form-input v-model="name" />
    </column>
  </form-group>

  <form-group>
    <column col=3 sm=12>
      <form-label>Email</form-label>
    </column>
    <column col=9 sm=12>
      <form-input
        v-model="email"
        type="email"
        placeholder="example@example.com"
      />
    </column>
  </form-group>

  <form-group>
    <column col=3 sm=12>
      <form-label>Gender</form-label>
    </column>
    <column col=9 sm=12>
      <form-radio-group v-model="gender" :options="['Male', 'Female']" />
    </column>
  </form-group>

  <form-group>
    <column col=3 sm=12>
      <form-label>Source</form-label>
    </column>
    <column col=9 sm=12>
      <form-select
        v-model="source"
        :options="['Slack', 'Skype', 'Hipchat', 'Telegram', 'WhatsApp']"
        size=3
        multiple
      />
      <form-checkbox v-model="spam" type="switch">
        Send me emails with news and tips
      </form-checkbox>
    </column>
  </form-group>

  <form-group>
    <column>
      <form-label>Message</form-label>
    </column>
    <column col=9 sm=12>
      <form-textarea v-model="message" />
      <form-checkbox v-model="remember">Remember me</form-checkbox>
    </column>
  </form-group>
</form-horizontal>`,
  }),
});
</script>
